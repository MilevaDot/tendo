import { ReactNode } from "react"

export interface ServiceCardProps {
    title: string
    icon: ReactNode
    description: string
    tooltip: string
    images: ReactNode
    benefits?: BenefitProps[]
    slogan?: string
    cita?:React.ReactNode
}

export interface ImageItem {
    src: string
    alt: string
    height: string
    marginTop?: number
}

export interface ImageGridProps {
    imageList: ImageItem[]
}

export interface BenefitProps {
    icon: React.ElementType
    text: string
}
