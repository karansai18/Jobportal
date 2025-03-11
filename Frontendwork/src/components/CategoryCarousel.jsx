// import { Carousel, CarouselPrevious,CarouselNext,CarouselItem,CaraouselContent } from '@/components/ui/carousel';
// import { Carousel,CarouselPrevious,CarouselContent,CarouselItem, CarouselNext } from './ui/carousel';
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from './ui/carousel.jsx';
import { Button } from './ui/button.jsx';
import React from 'react';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]


 
const CategoryCarousel = () => {
  return (
    <div>
        <Carousel className='w-full max-w-xl mx-auto my-200'>
            <CarouselContent>
                {
                    category.map((cat,index)=>(
                        <CarouselItem  key={index} className="md:basis-1/2 lg-basis-1/3">
                            <Button>{cat}</Button>

                        </CarouselItem>
                    ))

                    
                }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>

            
        </Carousel>
    </div>
  )
}

export default CategoryCarousel