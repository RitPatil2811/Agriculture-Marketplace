import { Routes } from '@angular/router';

//public pages
import { Home } from './pages/home/home';
import { Login } from './authentication/login/login';
import { Register } from './authentication/register/register';
import { PublicProducts } from './pages/public-products/public-products';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';

//farmer 
import { AddProduct } from './farmer/add-product/add-product';
import { Dashboard as FarmerDashboard } from './farmer/dashboard/dashboard';
import { EditProduct } from './farmer/edit-product/edit-product';
import { Products as FarmerProducts } from './farmer/products/products';
import { ViewProduct as FarmerViewProduct} from './farmer/view-product/view-product';
import { Orders } from './farmer/orders/orders';
import { Profile as FarmerProfile } from './farmer/profile/profile';
import { Earnings } from './farmer/earnings/earnings';
import { EditProfile as FarmerEditProfile } from './farmer/edit-profile/edit-profile';
import { ViewOrder as FarmerViewOrder } from './farmer/view-order/view-order';
//buyer
import { Products as BuyerProducts } from './buyer/products/products';
import { ProductDetails } from './buyer/product-details/product-details';
import { Dashboard as BuyerDashBoard } from './buyer/dashboard/dashboard';
import { Cart } from './buyer/cart/cart';
import { Checkout } from './buyer/checkout/checkout';
import { Orders as BuyerOrders } from './buyer/orders/orders';
import { Profile as BuyerProfile } from './buyer/profile/profile';
import { EditProfile as BuyerEditProfile } from './buyer/edit-profile/edit-profile';


//addmin
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ManageFarmer } from './admin/manage-farmer/manage-farmer';
import { ManageBuyer } from './admin/manage-buyer/manage-buyer';
import { ManageProduct } from './admin/manage-product/manage-product';
import { ManageOrder } from './admin/manage-order/manage-order';
import { Profile as AdminProfile } from './admin/admin-profile/admin-profile';
import { EditProfile as AdminEditProfile } from './admin/edit-profile/edit-profile';
import { ViewFarmer } from './admin/view-farmer/view-farmer';
import { ViewBuyer } from './admin/view-buyer/view-buyer';
import { ViewProduct as AdminViewProduct} from './admin/view-product/view-product';
import { ViewOrder } from './admin/view-order/view-order';
export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'products',
        component: PublicProducts
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'contact',
        component: Contact
    },

    // authentication routes
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },

    // farmer routes
    {
        path: 'farmer/add-product',
        component: AddProduct
    },
    {
        path: 'farmer/dashboard',
        component: FarmerDashboard
    },
    {
        path: 'farmer/products',
        component: FarmerProducts
    },
    {
        path: 'farmer/edit-product/:id',
        component: EditProduct
    },
    {
        path: 'farmer/view-product/:id',
        component: FarmerViewProduct
    },
    {
        path: 'farmer/view-order/:id',
        component: FarmerViewOrder
    },
    {
        path: 'farmer/orders',
        component: Orders
    },
    {
        path: 'farmer/profile',
        component: FarmerProfile
    },
    {
        path: 'farmer/edit-profile',
        component: FarmerEditProfile
    },
    {
        path: 'farmer/earnings',
        component: Earnings
    },

    // buyer routes
    {
        path: 'buyer/dashboard',
        component: BuyerDashBoard
    },
    {
        path: 'buyer/products',
        component: BuyerProducts
    },
    {
        path: 'buyer/product-details/:id',
        component: ProductDetails
    },
    {
        path: 'buyer/cart',
        component: Cart
    },
    {
        path: 'buyer/checkout',
        component: Checkout
    },
    {
        path: 'buyer/orders',
        component: BuyerOrders
    },
    {
        path: 'buyer/profile',
        component: BuyerProfile
    },
    {
        path: 'buyer/edit-profile',
        component: BuyerEditProfile
    },


    //admin routes
    {
        path: 'admin/dashboard',
        component: AdminDashboard
    },
    {
        path: 'admin/manage-farmer',
        component: ManageFarmer
    },
    {
        path: 'admin/manage-buyer',
        component: ManageBuyer
    },
    {
        path: 'admin/manage-product',
        component: ManageProduct
    },
    {
        path: 'admin/manage-order',
        component: ManageOrder
    },
    {
        path: 'admin/profile',
        component: AdminProfile
    },
    {
        path: 'admin/edit-profile',
        component: AdminEditProfile
    },
    {
        path: 'admin/view-farmer/:id',
        component: ViewFarmer
    },
    {
        path: 'admin/view-buyer/:id',
        component: ViewBuyer
    },
    {
        path: 'admin/view-product/:id',
        component: AdminViewProduct
    },
    {
        path: 'admin/view-order/:id',
        component: ViewOrder
    }
];