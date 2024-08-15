import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { LoginAuth } from '../../features/adminAuthSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Login = () => {

	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {error,loading} = useSelector((state)=>state.auth)
	const [errors, setErrors] = useState({});
	const [errorVisible,setErrorVisible] = useState('')
	
	

	useEffect(()=>{
		if(error){
		  setErrorVisible(true);
		  const timer = setTimeout(() => {
			setErrorVisible(false)
		  }, 3000);
		  return ()=>clearTimeout(timer)
		}
	  },[error])

	

	

	const validate = () =>{
		const errors = {};
    
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
	}

	

	const handleSubmit = (e)=>{
		e.preventDefault()
		const errors = validate();
		if (Object.keys(errors).length === 0) {
		dispatch(LoginAuth({email,password})).unwrap()
	.then(()=>{
		navigate('/admin/dashboard')
	})
	} else {
		setErrors(errors); // Show errors
    }
	}




  return (
	<main className="w-full h-screen flex flex-col items-center justify-center px-4">
	<div className="max-w-sm w-full text-gray-600">
		<div className="text-center">
			<img src={logo}  width={150} className="mx-auto bg-blue-700  rounded-3xl " />
			<div className="mt-5 space-y-2">
				<h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
				<p className="">Don't have an account? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">
					<Link to={'/admin/signin'}>
					Sign up
					</Link>
					
					</a></p>
			</div>
		</div>
		<form
			
			className="mt-8 space-y-5"
		>
			<div>
				<label className="font-medium">
					Email
				</label>
				<input
					type="email"
					value={email}
					onChange={(e)=>{setEmail(e.target.value);
						setErrors(prevErrors => ({ ...prevErrors, email: '' }));
					  }}
					required
					className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
				/>
				 {errors.email && <div className="text-red-600">{errors.email}</div>}
			</div>
			<div>
				<label className="font-medium">
					Password
				</label>
				<input
					type="password"
					value={password}
					onChange={(e)=>{
						setPassword(e.target.value)
						setErrors(prevErrors => ({ ...prevErrors, password: '' }));
					  }}
					required
					className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
				/>
				 {errors.password && <div className="text-red-600">{errors.password}</div>}
			</div>
			<button
			onClick={handleSubmit}
				className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
			>
				Sign in
			</button>
			{error  && <div className="mt-4 text-red-600">{error}</div>}
			{/* <div className="text-center">
				<a href="javascript:void(0)" className="hover:text-indigo-600">Forgot password?</a>
			</div> */}
		</form>
	</div>
</main>
  )
}

export default Login
