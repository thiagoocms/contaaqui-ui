import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PageButton} from '../../layout/page/page-button';
import {AuthDataService} from '../../shared/network/auth/auth-data.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Modal} from '../../layout/modal/app-modal/modal';
import {CategoryModel} from '../../shared/network/category/category.model';
import {map} from 'rxjs';
import {CategoryService} from '../../shared/network/category/category.service';
import {TransactionModel, TransactionType} from '../../shared/network/transaction/transaction.model';
import {TransactionService} from '../../shared/network/transaction/transaction.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  private fb: FormBuilder = inject(FormBuilder)
  private readonly authDataService: AuthDataService = inject(AuthDataService);
  protected readonly modalService: BsModalService = inject(BsModalService);
  private readonly categoryService: CategoryService = inject(CategoryService);
  private readonly transactionService: TransactionService = inject(TransactionService);
  private readonly toast: ToastrService = inject(ToastrService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  TransactionType = TransactionType;

  transactions: TransactionModel[] = [];

  competence: string = '';

  @ViewChild('transactionModal') transactionModal!: Modal;


  public form = this.fb.group({
    category: new FormControl<CategoryModel | null>(null, Validators.required),
    type: new FormControl<TransactionType | null>(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    date: new FormControl(new Date().toISOString().substring(0, 16), Validators.required),
  });

  buttons: PageButton[] = [{
    label: 'Novo',
    icon: 'plus',
    severity: 'primary',
    action: () => {
      this.modalService.show(this.transactionModal.template, {
        class: 'modal-lg modal-dialog-centered',
        backdrop: true,

      });
    },
  },
  ];

  public formFilter = this.fb.group({
    date: new FormControl({value: '', disabled: false}),
  });

  private userId: number | null = null;
  private _totalIncome: number = 0;
  private _totalExpense: number = 0;

  ngOnInit() {
    this.userId = this.authDataService.getUserId();

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    this.competence = `${year}-${month}`
    this.formFilter.controls.date.setValue(this.competence);
    this.findAll();
  }

  addTransaction() {
    if (this.form.invalid) return;
    const transaction: TransactionModel = {
      type: this.form.value.type,
      date: this.form.value.date + ':00',
      amount: Number(this.form.value.amount),
      userId: this.userId!,
      walletId: this.authDataService.getWalletId(),
      categoryId: this.form.value?.category?.id || null,
    } as TransactionModel;

    this.transactionService.create(transaction).subscribe({
      next: () => {
        this.form.reset({
          type: TransactionType.INPUT,
          date: new Date().toISOString().substring(0, 16)
        });
        this.toast.success("transação adicionada com sucesso");
        this.modalService.hide();
        this.findAll();
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Erro ao adicionar transação');
      }
    })

  }

  findAll() {
    if (!this.authDataService.getWalletId()) return;
    const queryParams = {
      deleted: false,
      walletId: this.authDataService.getWalletId(),
      competence: this.formFilter.value.date ?? '',
      sort: "date,DESC",
      size: 1000
    }
    this.transactionService.list(queryParams).subscribe({
      next: (res) => {
        this.transactions = res.content;
        this.calculateBalance();
        this.cdr.markForCheck();

      }
    })
  }

  calculateBalance() {
    this._totalIncome = this.transactions
      .filter(t => t.type === TransactionType.INPUT)
      .reduce((acc, t) => acc + t.amount, 0);

    this._totalExpense = this.transactions
      .filter(t => t.type === TransactionType.OUTPUT)
      .reduce((acc, t) => acc + t.amount, 0);
  }


  get totalIncome(): number {
    return this._totalIncome;
  }

  get totalExpense(): number {
    return this._totalExpense;
  }

  get balance(): number {
    return this._totalIncome - this._totalExpense;
  }

  searchCategories(term: string) {
    const queryParams = {
      name: term,
      active: true,
      userId: this.userId
    }
    return this.categoryService.list(queryParams).pipe(
      map(res => res.content)
    );
  }

}

