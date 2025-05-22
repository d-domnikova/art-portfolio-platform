import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ImagePicker from "../icons/ImagePicker";

export default function PostForm(){ 
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [post, setPost] = useState({
        title: "",
        description: "",
        postImage: "",
        alterText: "",
        isVisibleInPortfolio: false,
        imageSrc: null,
        imageFile: null
      });

      const [isVisibleInPortfolio, setIsVisibleInPortfolio] = useState(false);

      const handleChange = (e) => {
        const value = e.target.value;
        setPost({
          ...post,
          [e.target.name]: value,
        });
      };    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('description', post.description);
        formData.append('alterText', post.alterText);
        formData.append('isVisibleInPortfolio', isVisibleInPortfolio),
        formData.append('postImage', post.imageSrc);
        formData.append('imageFile', post.imageFile);
        formData.append('userId', localStorage.getItem('userId'))

        axios.post("https://localhost:7029/api/post", formData, 
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then(
                navigate("/user/" + localStorage.getItem("username"))
          );  
        }

        if(location.pathname != "/post/create") {
            useEffect(() => {
                axios.get(`https://localhost:7029/api/post/${id}`)
                .then(response => {
                     setPost(response.data);
                     setIsVisibleInPortfolio(response.data.isVisibleInPortfolio)
                 })
                 .catch(error => {
                     console.error(error);
                 });
             }, []);
        }

        const handleUpdateSubmit = (e) => {
            e.preventDefault();
           const formData = new FormData();
                formData.append('title', post.title);
                formData.append('description', post.description);
                formData.append('alterText', post.alterText);
                formData.append('isVisibleInPortfolio', isVisibleInPortfolio),

            axios.put(`https://localhost:7029/api/post/${id}`, formData, 
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then(
                    navigate(`/post/${id}`)
              );  
        }

        const checkOnChange = () => {
            setIsVisibleInPortfolio(!isVisibleInPortfolio);
        }

      const uploadImageDisplay = (e) => {
        const uploadedFile = e.target.files[0];
        console.log(e.target.files)
        const reader = new FileReader(); 
        reader.onload = x => {
            setPost({  
                ...post,
                imageFile: uploadedFile,
                imageSrc: x.target.result
            })
        }
        reader.readAsDataURL(uploadedFile);
    }

    console.log(post)
    return(
        <form className="m-auto w-[80%] md:w-[60%] flex flex-col justify-start space-y-3" autocomplete="off" 
                                                onSubmit={location.pathname == "/post/create"? handleSubmit : handleUpdateSubmit}>
            <div className="flex items-center justify-center w-full">
                <label for="imageFile" className="flex items-center justify-center w-full h-80 bg-cardinal/20 rounded-lg border border-dashed border-bone/80 
                            cursor-pointer hover:bg-cardinal/40">
                    <img className="object-scale-down rounded-lg h-80" src={post.imageSrc} />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {post.imageSrc == null && 
                        <>
                            <ImagePicker />
                            <p className="mb-2 text-sm font-semibold">Click to upload image</p>
                        </>}
                    </div>
                    <input id="imageFile" name="imageFile" type="file" className="hidden" accept="image/*" onChange={uploadImageDisplay} disabled={location.pathname != "/post/create" && true}/>
                </label>
            </div> 
            <input type="text" name="title" value={post.title} onChange={handleChange} 
                    className="py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Title"/>
            <textarea name="description" value={post.description} onChange={handleChange} 
                        className="p-4 w-full border border-bone lg:text-lg rounded-lg outline-hidden resize-none focus:ring placeholder:text-bone/80" 
                        rows="4" placeholder="Description"></textarea>
            <input type="text" name="alterText" value={post.alterText} onChange={handleChange} 
                    className="py-2 px-4 border border-bone lg:text-lg rounded-lg placeholder:text-bone/80 focus:ring" placeholder="Alter text"/>
            <div className="flex">
                <div className="flex items-center h-5">
                    <input name="isVisibleInPortfolio" type="checkbox" value={isVisibleInPortfolio} onChange={checkOnChange} checked={isVisibleInPortfolio ? 'checked' : ''}  
                        className="size-4 mt-2 accent-cardinal rounded-sm hover:ring-2 hover:ring-cardinal/70"/>
                </div>
                <div className="ms-2">
                    <label for="isVisibleInPortfolio" className="font-medium">Add to portfolio</label>
                    <p className="text-sm">This artwork will be visible in your portfolio tab. 
                        If not chosen, you can find this work in "All" tab on you profile.</p>
                </div>
            </div>
            <button type="submit" className="text-white bg-cardinal hover:bg-red-800/75 rounded-2xl mt-2 px-5 py-2 text-center inline">Post</button>
        </form>
    )
}