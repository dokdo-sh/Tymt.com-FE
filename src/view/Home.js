import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { OS } from '../utils/getEnv';
import { isMobile } from 'react-device-detect';
import DownloadComp from '../components/downloadComp';
import benefits from '../config/benefits';
import HeaderCard from '../components/headerCard';
import redImg from "../assets/images/red-effect.png";
function getCarousel () {
    const { innerWidth: width, innerHeight: height } = window;
    if( 768 < width && width <= 1200 && height){
        return {carousel:true, preview:2};
    }else if( width < 768 && height){
        return {carousel:true, preview:1};
    }else{
        return {carousel:false, preview:0};
    }
    
}
const HomeSection = () => {
    const [os] = useState(OS(window));
    const [osBtn, setOsBtn] = useState("common-btn-win");
    const [carousel, setCarousel] = useState(false);
    const [preview, setPreview] = useState();
    useEffect(()=>{
        if(os==="Windows OS"){
            setOsBtn("common-btn-win");
        }else{
            setOsBtn("common-btn-linux");
        }
    },[os]);
    useEffect(() => {
        const {carousel, preview} = getCarousel();
        setCarousel(carousel);
        setPreview(preview);
        function handleResize() {
            const {carousel, preview} = getCarousel();
            setCarousel(carousel);
            setPreview(preview);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return(
        <section id="home" className="home home-section">
            <div className='red-effect'><img src={redImg} alt='red effect'/></div>
            <div className='mac-img'></div>
            <div className='container flex-colum' style={{position:'relative', zIndex:10}}>
                <div className='row detail-container'>
                    <div className='col-12'>
                        <div className='description'>
                            <div className='fs-96 bold italic white nowrap'>Welcome to</div> 
                            <span className='fs-96 bold italic blue nowrap'>the future</span>
                            <span className='fs-96 bold italic white nowrap'> of</span>
                            <div className='fs-96 bold italic white nowrap'>gaming!</div> 
                        </div>
                        <div className='fs-20 white m-tb-20' style={{maxWidth: '550px'}}>
                            Tymt is a multi-chain game launcher and an environment fo creating and publishing games
                        </div>
                        {!isMobile && 
                            <div className={`${osBtn} download-btn red-btn fs-18 bold-semi white`}>
                                Install and Play now
                                <div className="dropdown-content">
                                    <DownloadComp />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='row card-container'>
                    {!carousel && benefits.map((item, index)=> (
                        <div className='col-3' key={index}>
                            <HeaderCard data={item} index = {index}/>
                        </div>
                    ))}
                    
                </div>
            </div>
            {carousel && (
                <Swiper slidesPerView={preview} spaceBetween={30} centeredSlides={true} pagination={{ clickable: true, }} loop={true}>
                    {
                        benefits.map((item, index)=> (
                            <SwiperSlide key={index}>
                                <HeaderCard data={item} index = {index}/>
                            </SwiperSlide>
                        ))
                    }
            </Swiper>)}
        </section>
    )
}

export default HomeSection;