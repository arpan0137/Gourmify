import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/register'
    const isAdminLoginPath = path === '/admin/login' || path === '/admin/register'
    const isAdminPath = path === '/admin/categories' || path === '/admin/addproduct' || path === '/admin/menu-items' || path === '/admin/viewproducts' || path === '/admin/users'
    const token = cookies().get('token')
    if (path === '/admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    if (isAdminPath && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    if (isAdminLoginPath && token) {
        return NextResponse.redirect(new URL('/admin/addproduct', request.url))
    }
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!isAdminPath && !isAdminLoginPath && !isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/profile',
        '/login',
        '/register',
        '/admin',
        '/admin/login',
        '/admin/register',
        '/admin/categories',
        '/admin/menu-items',
        '/admin/users',
        '/admin/addproduct',
        '/admin/viewproducts'
    ],
}