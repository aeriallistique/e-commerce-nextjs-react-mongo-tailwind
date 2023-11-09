import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

 function Categories({swal}){
  const [editedCategory, setEditedCategory]= useState(null);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');

  useEffect(()=>{
    fetchCategories()
  },[])

  function fetchCategories(){
    axios.get('/api/categories').then(result=>{
      setCategories(result.data);
    })
  }

  async function saveCategory(ev){
    ev.preventDefault();
    const data = {name, parentCategory}
    data._id = editedCategory?._id;

    if(editedCategory){
      await axios.put('/api/categories', data)
      setEditedCategory(null);
    }else{
      await axios.post('/api/categories', data);
    }
    setName('');
    fetchCategories();
  }

  function editCategory(category){
    setEditedCategory(category);
    setName(category.name)
    setParentCategory(category.parent?._id)
  }

  function deleteCategory(category){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,   
  }).then(async result => {
      // when confirmed and promise resolved...
      if(result.isConfirmed){
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id);
        fetchCategories();
      }
  })
  }


  return(
    <Layout>
      <h1>categories</h1>
      <label >
        {editedCategory ? `Edit Category ${editedCategory.name} `: 'Create Category name' }
      </label>
      <form onSubmit={saveCategory} className="flex gap-1 py-1">
        <input 
          className="mb-0" 
          type="text" 
          placeholder={'Category name'} 
          value={name}
          onChange={ev=> setName(ev.target.value)}
          />
        <select 
          className="mb-0"
          onChange={ev => setParentCategory(ev.target.value)}
          value={parentCategory}
          >
          <option value="0">No parent category</option>
          {categories?.length > 0 && categories.map(category =>(
            <option 
              value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary">Save</button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 && categories.map(category =>(
            <tr>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td>
                
                <button 
                  className="btn-primary mr-1"
                  onClick={()=> editCategory(category)}
                  >
                    Edit
                  </button>
                <button 
                  onClick={()=> deleteCategory(category)}
                  className="btn-primary">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal}/>
))