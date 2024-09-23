import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./domains/products/pages/list/list.component') // Para LazyLoading con importación dinámica y arrow functions
                //component: ListComponent
            },
            {
                path: 'about',
                loadComponent: () => import('./domains/info/pages/about/about.component')
                //component: AboutComponent
            },
            {
                path: 'product/:id',
                loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component')
                //component: ProductDetailComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
