import React from 'react'
import { FaPhone } from 'react-icons/fa';
import WhatsAppButton from '../components/WhatsAppButton';
import { useNavigate } from 'react-router-dom';
import Bisness from '../assets/Bisness.png'


const Meet= () => {

    const handleClick = () => {
        const phoneNumber = "9079001762";
        const message = "Hello, I visited your site and want to know more!";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url)
    }


    return (
        <>
            <div className='bg-gradient-to from bg-linear-to-r from bg-purple-100 via-white '>


                <div className='py-4.5 text-center w-full max-w-full' >
                    <h1 className="font-  text-2xl leading-14 text-black inline-block relative after:content- after:block after:h-[4px] after:w-full after:mt-1 after:bg-gradient-to-r after:from-indigo-300 after:via-pink-300 after:to-purple-300 ">Pixelgenix IT Solution "Crafting Tomorrow’s  Digital Success"</h1>
                </div>
                <div className="container mx-auto w-full max-w-[1200px] px-6 flex flex-col gap-4 sm:flex-row sm:gap-6 ">

                    {/* right side */}

                    <div className='w-full sm:max-w-[70%] justify-centre'>

                        <div className='py-2.5'>
                            <p className='font-normal text-[16px] text-justify'>Behind every successful project at Pixelgenix IT Solution is a passionate team of skilled professionals. Our team is a blend of experienced developers, creative designers, strategic thinkers, and tech enthusiasts — all committed to delivering excellence. Each member brings a unique set of skills and fresh perspectives, allowing us to collaborate effectively and solve complex challenges with innovation and precision. At Pixelgenix, we don’t just work together — we grow together, driven by a shared vision of creating powerful digital solutions that make an impact.</p>
                        </div>
                        <div className='py-2.5'>
                            <p className='font-semibold text-[18px]'> ✔️ 50+ Countries Serving</p>
                            <p className='font-semibold text-[18px]'> ✔️ 250+ IT Professionals</p>
                            <p className='font-semibold text-[18px]'> ✔️ 4.6 Clutch Rating</p>
                            <p className='font-semibold text-[18px]'> ✔️ Transparent Processes</p>
                        </div>

                        <div className='py-5.5'>
                            <button className='bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-3 cursor-pointer' onClick={handleClick}>Contact US <FaPhone /></button>
                        </div>
                    </div>
                    {/* left Side  */}
                    <div className="relative w-[70%] h-auto rounded-lg overflow-hidden ">
                        <img className='absolute bottom-0 right-2 w-full h-[400px] ' src={Bisness} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Meet;