'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const slides = [
  {
    id: 1,
    imageSrc: '/images/home/cctv-intstallation1.jpg.webp',
    title: 'Professional CCTV Installation',
    subtitle: 'Secure your property with our advanced surveillance solutions',
    ctaText: 'Get Protected',
    ctaLink: '/services/cctv-installation',
  },
  {
    id: 2,
    imageSrc: '/images/home/dstv-installation.png',
    title: 'DStv Installation Services',
    subtitle: 'Premium satellite TV installation for your home or business',
    ctaText: 'Explore Packages',
    ctaLink: '/services/dstv-installation',
  },
  {
    id: 3,
    imageSrc: '/images/home/electrical-wiring.jpg',
    title: 'Electrical Wiring Experts',
    subtitle: 'Safe and reliable electrical installations',
    ctaText: 'Request Service',
    ctaLink: '/services/electrical-wiring',
  },
];

const titleVariant = {
  hidden: { y: '-20%', opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const subtitleVariant = {
  hidden: { y: '20%', opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ctaVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white/70',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
        }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-screen max-h-[800px]"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <SwiperSlide key={slide.id} className="relative">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
              <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4 text-white">
                <div className="max-w-3xl space-y-6">
                    <motion.div
                        variants={titleVariant}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                        {slide.title}
                        </h1>
                    </motion.div>

                  {slide.subtitle && (
                    <motion.div
                        variants={subtitleVariant}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                    >
                      <p className="text-xl md:text-2xl drop-shadow-lg">
                        {slide.subtitle}
                      </p>
                    </motion.div>
                  )}

                  {slide.ctaText && slide.ctaLink && (
                    <motion.div
                      variants={ctaVariant}
                      initial="hidden"
                      animate={isActive ? 'visible' : 'hidden'}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                    >
                      <Link
                        href={slide.ctaLink}
                        className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors mt-6"
                      >
                        {slide.ctaText}
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
