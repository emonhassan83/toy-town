import { Link, useRouteError } from 'react-router-dom'
import img from '../../assets/404/error.svg'

const ErrorPage = () => {
  const { error, status } = useRouteError()
  return (
    <section className='h-screen p-16 text-gray-900'>
      <div className='container md:flex items-center justify-center px-5 mx-auto my-8 gap-10'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-gray-700'>
            <span className='sr-only'>Error</span>
            {status || 404}
          </h2>
          <p className='text-2xl font-bold md:text-3xl text-gray-800 mb-8'>
            {error?.message}
          </p>
          <Link to='/' className='btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-6'>
            Back to homepage
          </Link>
        </div>
        <div>
        <img className='w-full lg:w-[650px]' src={img} alt="" />
        </div>
      </div>
    </section>
  )
}

export default ErrorPage