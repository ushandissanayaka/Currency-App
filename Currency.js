import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Currency() {

  //state for the form feilds
  const [date,setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [ currncyNames, setCurrncyNames] = useState([]);
  const [ loading,  setLoading] = useState(true);

  //handle submit method

  const handleSubmit = async(e) => {
    e.preventDefault();
   try{
    
    const responce = await axios.get("http://localhost:5000/convert",{
      params:{
        date,
        sourceCurrency , 
       targetCurrency,
        amountInSourceCurrency,
      },
    });

    setAmountInTargetCurrency(responce.data);

    console.log(amountInSourceCurrency, amountInTargetCurrency);
   }catch(err){
    console.error(err);
   }
  
  };

  //get all currency name

  useEffect(()=>{
    const getCurrencyNames = async() => {
      try{
       
         const responce = await axios.get(
          "http://localhost:5000/getAllCurrencies"
         );
         setCurrncyNames(responce.data);

      }catch(err){
        console.error(err)

      }
    };
    getCurrencyNames();
  } , []);
  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-red-500'>Currency Convertor</h1>
        <p className='lg:mx-32 opacity-40 py-6'>If you need to cash out, there are basically two 
            options for how to exchange the Paragraph into a
             US Dollar. First, you can swap it peer-to-peer 
             with a person who's interested in buying Paragraph 
             for fiat money. Generally, this option is more anonymous, 
             but it is also less secure. Second, you can sell Paragraph
              on specialized crypto exchange platforms such as Binance, 
              Coinbase, Crypto.com or FTX. In case Paragraph is not listed 
              yet, you might need to swap it into ETH first by using one of
               the decentralized exchanges</p>

               <div className='mt-5 flex items-center justify-center flex-col'>
                <section className='w-full lg:w-1/2 '>
                  <form onSubmit={handleSubmit}>


                  <div className="mb-4">
    <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
    <input onChange={(e)=> setDate(e.target.value)} type="Date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="" required></input>
  </div>

  <div className="mb-4">
    <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
    <select onChange={(e)=> setSourceCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" name={sourceCurrency} id={sourceCurrency} value={sourceCurrency}>
     <option value="">Select source currency</option>
      {Object.keys(currncyNames).map((currency)=>(
        <option className="p-1"  value={currency}>
          {currncyNames[currency]}
          </option>
          
        ))}
       
      
    </select>
  </div>

  <div className="mb-4">
    <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
    <select onChange={(e)=>setTargetCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" name={targetCurrency} id={targetCurrency} value={targetCurrency}>
    <option value="">Select Target currency</option>
      {Object.keys(currncyNames).map((currency)=>(
        <option className="p-1"  value={currency}>
          {currncyNames[currency]}
          </option>
          
        ))}

    </select>
  </div>

  <div className="mb-4">
    <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>
    <input onChange={(e)=> setAmountInSourceCurrency(e.target.value)} type="text" id={amountInSourceCurrency} name={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Amount in source currency" required></input>
  </div>

<button  className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md'>Get the target currency</button>
     
                  </form>
                </section>
               </div>
             <section className='lg:mx-72  mt-5'>
             {amountInSourceCurrency} {currncyNames[sourceCurrency]} is equals to {""}
               <span className='text-red-500 font-bold'>{""}{amountInTargetCurrency} </span>in  {currncyNames[targetCurrency]}
             </section>
    </div>
  );
}
