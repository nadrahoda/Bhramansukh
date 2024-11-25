import Image from 'next/image'
import { FaUserCheck, FaUsers, FaMotorcycle, FaPlane } from 'react-icons/fa6'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { MdEditNote } from 'react-icons/md'

// Import images as modules
import img1 from '../public/assets/trip1.jpg'
import img2 from '../public/assets/trip2.jpg'
import img3 from '../public/assets/trip3.jpg'
import img4 from '../public/assets/trip4.jpg'
import img5 from '../public/assets/trip5.jpg'

const WhyChooseUs: React.FC = () => {
  return (
    <div className='flex md:flex-row flex-col gap-8 p-8 bg-gray-800 text-white py-24'>
      {/* Left Section with Images */}
      <div className='w-full order-2 md:w-2/6 grid grid-cols-2 md:gap-4 gap-2'>
        {/* First Column with 2 Images */}
        <div className='grid grid-rows-2 md:gap-3 gap-2'>
          <Image
            src={img1}
            alt='Trip 1'
            className='md:w-[300px] md:h-[310px] w-[150px] h-[160px] object-cover rounded-lg'
            width={300}
            height={310}
          />
          <Image
            src={img2}
            alt='Trip 2'
            className='md:w-[300px] md:h-[310px] w-[150px] h-[160px]  object-cover rounded-lg'
            width={300}
            height={310}
          />
        </div>

        {/* Second Column with 3 Images */}
        <div className='grid grid-rows-3 md:gap-3 gap-1'>
          <Image
            src={img3}
            alt='Trip 3'
            className='w-[200px] h-[100px] md:w-[300px] md:h-[200px]   object-cover rounded-lg'
            width={300}
            height={200}
          />
          <Image
            src={img4}
            alt='Trip 4'
            className='w-[200px] h-[100px] md:w-[300px] md:h-[200px] object-cover rounded-lg'
            width={300}
            height={200}
          />
          <Image
            src={img5}
            alt='Trip 5'
            className='w-[200px] h-[100px] md:w-[300px] md:h-[200px] object-cover rounded-lg'
            width={300}
            height={200}
          />
        </div>
      </div>

      {/* Right Section with Text */}
      <div className='w-full md:w-4/6 flex flex-col items-start'>
        <h2 className='text-gray-400 text-lg uppercase tracking-widest'>
          Why Choose Us
        </h2>
        <h4 className='text-white text-2xl md:text-4xl font-bold flex flex-start tracking-wide'>
          Why भ्रMan Sukh
        </h4>
        <p className='italic text-lg md:mt-10 mt-3'>
          "Every destination has a story; make it yours."
        </p>
        <p className='text-sm md:text-lg text-left md:mt-10 mt-3 text-balance text-gray-300'>
          Our team is dedicated to providing you with outstanding travel
          experiences that combine comfort, adventure, and cultural exploration.
          From hand-picked destinations to personalized services, we ensure
          every journey is memorable. With years of expertise in the travel
          industry, we pride ourselves on delivering exceptional itineraries
          crafted to meet your needs and exceed your expectations. Whether
          you're looking for a peaceful retreat or a thrilling adventure, our
          extensive network of partners allows us to offer the best prices and
          exclusive experiences. Choose us for seamless travel planning, 24/7
          support, and a commitment to making your travel dreams a reality. Let
          us handle the details so you can immerse yourself in the journey and
          focus on creating unforgettable memories.
        </p>

        {/* Icon Section */}
        <div className='grid grid-cols-3 gap-8 mt-10 w-full'>
          {/* Icon 1 */}
          <div className='flex flex-col items-center text-center'>
            <FaUserCheck className='text-4xl text-gray-400 mb-2 bg-white bg-opacity-10 p-2 rounded-lg' />
            <p className='text-white font-semibold text-sm md:text-lg'>
              50,000+
            </p>
            <p className='text-gray-300 text-xs md:text-base'>
              Satisfied Travelers
            </p>
          </div>

          {/* Icon 2 */}
          <div className='flex flex-col items-center text-center'>
            <FaUsers className='text-4xl text-gray-400 mb-2 bg-white bg-opacity-10 p-2 rounded-lg' />
            <p className='text-white font-semibold text-sm md:text-lg'>150+</p>
            <p className='text-gray-300 text-xs md:text-base'>
              All Girls Trips
            </p>
          </div>

          {/* Icon 3 */}
          <div className='flex flex-col items-center text-center'>
            <FaMotorcycle className='text-4xl text-gray-400 mb-2 bg-white bg-opacity-10 p-2 rounded-lg' />
            <p className='text-white font-semibold text-sm md:text-lg'>250+</p>
            <p className='text-gray-300 text-xs md:text-base'>Bike Trips</p>
          </div>

          {/* Icon 4 */}
          <div className='flex flex-col items-center text-center'>
            <FaMapMarkedAlt className='text-4xl text-gray-400 mb-2 bg-white bg-opacity-10 p-2 rounded-lg' />
            <p className='text-white font-semibold text-sm md:text-lg'>
              Customized
            </p>
            <p className='text-gray-300 text-xs md:text-base'>Trips</p>
          </div>

          {/* Icon 5 */}
          <div className='flex flex-col items-center text-center'>
            <MdEditNote className='text-4xl text-gray-400 mb-2 bg-white bg-opacity-10 p-2 rounded-lg' />
            <p className='text-white font-semibold text-sm md:text-lg'>
              Hand-picked
            </p>
            <p className='text-gray-300 text-xs md:text-base'>Itineraries</p>
          </div>

          {/* Icon 6 */}
          <div className='flex flex-col items-center text-center'>
            <FaPlane className='text-4xl text-gray-400 mb-2 bg-white bg-opacity-10 p-2 rounded-lg' />
            <p className='text-white font-semibold text-sm md:text-lg'>
              Exclusive
            </p>
            <p className='text-gray-300 text-xs md:text-base'>Experiences</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
