import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

/**
 * Create Component
 */
export class CreateComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  InvoicesForm!: UntypedFormGroup;
  paymentSign = "$";
  subtotal = 0;
  taxRate = 0.125;
  shippingRate = 65.0;
  discountRate = 0.15;

  userForm: UntypedFormGroup;
  

  constructor(private formBuilder: UntypedFormBuilder) { 

    this.userForm = this.formBuilder.group({
      items: this.formBuilder.array([
        this.formBuilder.control(null)
      ])
    })

    /**
     * Form Validation
     */
     this.InvoicesForm = this.formBuilder.group({
      companyAddress: ['', [Validators.required]],
      companyaddpostalcode: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      companyEmail: ['', [Validators.required]],
      companyWebsite: ['', [Validators.required]],
      companyContactno: ['', [Validators.required]],
      billingName: ['', [Validators.required]],
      billingAddress: ['', [Validators.required]],
      billingPhoneno: ['', [Validators.required]],
      billingTaxno: ['', [Validators.required]],
      same: ['', [Validators.required]],
      shippingName: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required]],
      shippingPhoneno: ['', [Validators.required]],
      shippingTaxno: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      items: [''],
    });    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Invoice Details', active: true }
    ];

    

  }

  /**
   * Form data get
   */
   get form() {
    return this.InvoicesForm.controls;
  }


   /**
  * Save user
  */
    saveUser() {
      this.submitted = true
    }

  // Default
  counter = 0;
  increment() {
    this.counter++;
    var itemAmount = document.querySelector('.product-price') as HTMLInputElement;
    var priceselection = document.querySelector(".product-line-price") as HTMLInputElement;
    this.updateQuantity(itemAmount?.value, this.counter, priceselection);
  }

  decrement() {
    this.counter--;
    var itemAmount = document.querySelector('.product-price') as HTMLInputElement;
    var priceselection = document.querySelector(".product-line-price") as HTMLInputElement;
    this.updateQuantity(itemAmount?.value, this.counter, priceselection);
  }

  updateQuantity(amount: any, itemQuntity: any, priceselection:any){
    var linePrice = amount * itemQuntity;    
    priceselection.value = linePrice;
    this.recalculateCart();
  }

  recalculateCart(){
    var priceselection = document.querySelector(".product-line-price") as HTMLInputElement;
    this.subtotal = parseFloat(priceselection.value);
    var tax = this.subtotal * this.taxRate;
	  var discount = this.subtotal * this.discountRate;
	  var shipping = this.subtotal > 0 ? this.shippingRate : 0;
	  var total = this.subtotal + tax + shipping - discount;
    var subTotal = document.getElementById("cart-subtotal") as HTMLInputElement;    
    var cartTax = document.getElementById("cart-tax") as HTMLInputElement;
    var cartShipping = document.getElementById("cart-shipping") as HTMLInputElement;
    var cartTotal = document.getElementById("cart-total") as HTMLInputElement;
    var cartDiscount = document.getElementById("cart-discount") as HTMLInputElement;
    var totalamountInput = document.getElementById("totalamountInput") as HTMLInputElement;
	  var amountTotalPay = document.getElementById("amountTotalPay") as HTMLInputElement;

    subTotal.value = priceselection.value;
    cartTax.value = this.paymentSign + tax;
    cartShipping.value = shipping.toFixed(2);
    cartTotal.value = total.toFixed(2);
    cartDiscount.value = discount.toFixed(2);
    totalamountInput.value = total.toFixed(2);
    amountTotalPay.value = total.toFixed(2);
  }

  // Add Item
  addItem(): void {
    (this.userForm.get('items') as UntypedFormArray).push(
      this.formBuilder.control(null)
    );
  }

  // Get Item Data 
  getItemFormControls(): AbstractControl[] {
    return (<UntypedFormArray> this.userForm.get('items')).controls
  }

  // Remove Item
  removeItem(index:any) {
    (this.userForm.get('items') as UntypedFormArray).removeAt(index);
  }

}
