import connectMongoDB from "@/components/db/mongodb"
import { Category } from "@/components/models/CategorySchema"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongoDB()
        const { name } = await req.json()
        const category = await Category?.findOne({ 'name': name })
        if (category) {
            return NextResponse.json({ success: false, error: "Category Already Exists !!" })
        }
        const newCategory = new Category({ name })
        await newCategory.save()
        return NextResponse.json({ success: true, data: newCategory, message: "Category Created Successfully !!" })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}


export async function GET() {
    const categories = await Category.find()
    return NextResponse.json(categories)
}


export async function PUT(req) {
    await connectMongoDB()
    const { id, editedCategory } = await req.json();
    console.log(id)

    const category = await Category?.findOne({ 'name': editedCategory })
    if (category) {
        return NextResponse.json({ success: false, error: "Category Already Exists !!" })
    }

    await Category.findOneAndUpdate({ _id: id }, { name: editedCategory })
    return NextResponse.json({ success: true, message: "Category Updated Successfully !!" })
}


export async function DELETE(req) {
    try {
        const { id } = await req.json()
        await Category.findOneAndDelete({ _id: id })
        return NextResponse.json({ success: true, message: "Category Deleted Successfully !!" })
    }
    catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}