import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Spinner from "./spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title:existingTitle, 
  description: existingDescription, 
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  }){

  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription || '')
  const [price, setPrice] = useState(existingPrice || '')
  const [goToProducts, setGoToProducts] = useState(false)
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory]= useState(assignedCategory || '')
  const router = useRouter();

  useEffect(()=>{
    axios.get('/api/categories').then(result=>{
      setCategories(result.data);
    })
  },[])

  async function saveProduct(ev){
    ev.preventDefault();
    const data = {title, description,price, images, category};
    if(_id){
      // update
      await axios.put('/api/products', {...data, _id})
    }else{
      // create
      await axios.post('/api/products', data);
    }
    setGoToProducts(true)

  }
 
  if(goToProducts){
    router.push('/products');
  }

  async function uploadImages(ev){
    const files = ev.target?.files;
    if(files?.length > 0){
      setIsUploading(true)
      const data = new FormData();
      for (const file of files){
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data);
      setImages(oldImages=>{
        return [...oldImages, ...res.data.links];
      })
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images){
    setImages(images);
  }
 

  return(
      <form onSubmit={saveProduct}>
        <label htmlFor="">Product name</label>
        <input 
          type="text" 
          placeholder="product name" 
          value={title}
          onChange={(ev)=> setTitle(ev.target.value)}
        />
        <label >Category</label>
        <select 
          value={category} 
          onChange={ev => setCategory(ev.target.value)}
        >
          <option value="">Uncategorised</option>
          {categories?.length>0 && categories.map(c =>(
            <option value={c._id}>{c.name}</option>
          ))}
        </select>
        <label>
          Photos
        </label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable 
            list={images} 
            setList={updateImagesOrder}
            className="flex flex-wrap gap-1"
            >
          {!!images?.length && images.map(link =>(
            <div key={link} className="h-24">
              <img src={link} alt="" className="rounded-lg"/>
            </div>
          ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 p-1 bg-gray-200 flex items-center rounded-lg">
              <Spinner />
            </div>
          )}
          <label  
            className="w-24 h-24 text-sm gap-1 rounded-lg bg-gray-200 text-gray-500 text-center flex flex-col items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
            </svg>
            <div>Upload</div>  
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
       
        </div>
        <label htmlFor="">Description</label>
        <textarea 
          placeholder="description"
          value={description}
          onChange={(ev)=> setDescription(ev.target.value)}
          >
        </textarea>
        <label htmlFor="">Price (in USD)</label>
        <input 
          type="text" 
          placeholder="price" 
          value={price}
          onChange={(ev)=> setPrice(ev.target.value)}
        />
        <button 
          type="submit" 
          className="btn-primary">
            Save
        </button>
      </form>
  )
}