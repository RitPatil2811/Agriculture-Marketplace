import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector:'app-dashboard',
  standalone:true,
  imports:[RouterLink,BuyerSidebar],
  templateUrl:'./dashboard.html',
  styleUrl:'./dashboard.css'
})
export class Dashboard implements OnInit{
  userId:number=0;
  totalOrders:number=0;
  cartItems:number=0;
  totalSpent:number=0;
  pendingOrders:number=0;
  featuredProducts:any[]=[];
  recentOrders:any[]=[];
  loading:boolean=true;

  constructor(
    private cartService:CartService,
    private productService:ProductService,
    private orderService:OrderService,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit():void{
    this.userId=Number(localStorage.getItem('userId'));
    if(!this.userId){
      alert('Please login first.');
      return;
    }
    this.loadDashboard();
  }

  loadDashboard():void{
    this.loadOrders();
    this.loadCart();
    this.loadProducts();
  }

  loadOrders(): void {

  this.orderService.getBuyerOrders(this.userId).subscribe({

    next: (orders: any[]) => {

      console.log('BUYER DASHBOARD ORDERS:', orders);

      this.totalOrders = orders.length;

      this.totalSpent = orders.reduce(
        (sum: number, order: any) =>
          sum + Number(order.total || 0),
        0
      );

      this.pendingOrders = orders.filter(
        (order: any) => order.status === 'Pending'
      ).length;

      this.recentOrders = orders
        .sort((a: any, b: any) => {
          return (
            new Date(b.orderDate).getTime() -
            new Date(a.orderDate).getTime()
          );
        })
        .slice(0, 5)
        .map((order: any) => ({
          ...order,
          image: this.getImageUrl(order.productImage)
        }));

      console.log(
        'RECENT ORDERS:',
        this.recentOrders
      );

      this.loading = false;

      this.cdr.detectChanges();
    },

    error: (error) => {

      console.error(
        'Failed to load buyer orders:',
        error
      );

      this.totalOrders = 0;
      this.totalSpent = 0;
      this.pendingOrders = 0;
      this.recentOrders = [];

      this.loading = false;

      this.cdr.detectChanges();
    }
  });
}

  

  loadCart():void{
    this.cartService.getUserCart(this.userId).subscribe({
      next:(cart:any[])=>{
        console.log('BUYER DASHBOARD CART:',cart);

        this.cartItems=cart.reduce(
          (sum:number,item:any)=>sum+Number(item.quantity||0),
          0
        );

        this.cdr.detectChanges();
      },
      error:(error)=>{
        console.error('Failed to load cart:',error);
        this.cartItems=0;
        this.cdr.detectChanges();
      }
    });
  }

  loadProducts():void{
    this.productService.getAllProducts().subscribe({
      next:(products:any[])=>{
        console.log('BUYER DASHBOARD PRODUCTS:',products);

        this.featuredProducts=products.slice(0,4).map((product:any)=>({
          ...product,
          image:this.getImageUrl(product.image)
        }));

        this.cdr.detectChanges();
      },
      error:(error)=>{
        console.error('Failed to load products:',error);
        this.featuredProducts=[];
        this.cdr.detectChanges();
      }
    });
  }

  getImageUrl(image:string):string{
    if(!image){
      return 'assets/images/no-image.png';
    }

    if(image.startsWith('http')){
      return image;
    }

    return 'http://localhost:8080'+image;
  }

  addToCart(product:any):void{
    this.cartService.addToCart(this.userId,product.id,1).subscribe({
      next:()=>{
        alert(`${product.name} added to cart successfully.`);
        this.loadCart();
      },
      error:(error)=>{
        console.error('Failed to add to cart:',error);
        alert(error?.error?.message||'Failed to add product to cart.');
      }
    });
  }
}