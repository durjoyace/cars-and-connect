import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const make = searchParams.get('make')
    const yearStart = searchParams.get('yearStart')
    const yearEnd = searchParams.get('yearEnd')
    const maxPrice = searchParams.get('maxPrice')
    const rarity = searchParams.get('rarity')

    const where: any = {}

    if (search) {
      where.OR = [
        { make: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { trim: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (make) {
      where.make = make
    }

    if (yearStart || yearEnd) {
      where.year = {}
      if (yearStart) where.year.gte = parseInt(yearStart)
      if (yearEnd) where.year.lte = parseInt(yearEnd)
    }

    if (maxPrice) {
      where.currentValue = { lte: parseInt(maxPrice) }
    }

    if (rarity) {
      where.rarity = rarity
    }

    const cars = await prisma.car.findMany({
      where,
      orderBy: [{ make: 'asc' }, { model: 'asc' }, { year: 'desc' }],
    })

    return NextResponse.json(cars)
  } catch (error) {
    console.error('Failed to fetch cars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const car = await prisma.car.create({
      data: {
        make: body.make,
        model: body.model,
        year: body.year,
        trim: body.trim,
        vin: body.vin,
        engineType: body.engineType,
        horsepower: body.horsepower,
        torque: body.torque,
        transmission: body.transmission,
        drivetrain: body.drivetrain,
        weight: body.weight,
        zeroToSixty: body.zeroToSixty,
        topSpeed: body.topSpeed,
        msrp: body.msrp,
        currentValue: body.currentValue,
        imageUrl: body.imageUrl,
        movieAppearances: body.movieAppearances,
        famousOwners: body.famousOwners,
        productionCount: body.productionCount,
        rarity: body.rarity,
        auctionHistory: body.auctionHistory ? JSON.stringify(body.auctionHistory) : null,
        provenance: body.provenance ? JSON.stringify(body.provenance) : null,
      },
    })

    return NextResponse.json(car)
  } catch (error) {
    console.error('Failed to create car:', error)
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    )
  }
}
