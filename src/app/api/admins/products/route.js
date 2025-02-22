import connectMongoDB from "@/components/db/mongodb"
import { Product } from "@/components/models/ProductSchema"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongoDB()
        const payload = await req.json()
        let productBySlug = await Product.findOne({ slug: payload?.itemSlug })
        if (productBySlug) {
            return NextResponse.json({ success: false, product: productBySlug, error: "Slug Already Exists !!" })
        }
        let productByTitle = await Product.findOne({ title: payload?.itemTitle })
        if (productByTitle) {
            return NextResponse.json({ success: false, error: "Title Already Exists !!" })
        }
        let productById = await Product.findOne({ _id: payload?.id })
        if (productById) {
            return NextResponse.json(productById)
        }
        const newItem = new Product({ title: payload.itemTitle, slug: payload.itemSlug, category: payload.itemCategory, desc: payload.itemDesc, price: payload.itemPrice, image: payload.itemImageLink })
        await newItem.save()
        return NextResponse.json({ success: true, data: newItem, message: "Item Added Successfully !!" })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}

export async function GET() {
    await connectMongoDB()
    const products = await Product.find()
    return NextResponse.json(products)
}

export async function PUT(req) {
    await connectMongoDB()
    const { id, newItemTitle, newItemSlug, newItemCategory, newItemDesc, newItemPrice, itemImageLink } = await req.json();
    await Product.findOneAndUpdate({ _id: id }, { title: newItemTitle, slug: newItemSlug, category: newItemCategory, desc: newItemDesc, price: newItemPrice, image: itemImageLink })
    return NextResponse.json({ success: true, message: "Item Updated Successfully !!" })
}

export async function DELETE(req) {
    await connectMongoDB()
    try {
        const { id } = await req.json()
        await Product.findOneAndDelete({ _id: id })
        return NextResponse.json({ success: true, message: "Item Deleted Successfully !!" })
    }
    catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}
