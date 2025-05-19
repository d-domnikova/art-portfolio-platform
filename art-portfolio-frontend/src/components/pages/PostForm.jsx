import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import ImagePicker from "../icons/ImagePicker";

export default function PostForm(){
    const [imageURL, setImageURL] = useState();
    const fileUploadRef = useRef(null);  
    const [categories, setCategories] = useState([]);
    useEffect(() => {
       axios.get('https://localhost:7029/api/category')
       .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    
    const [post, setPost] = useState({
        title: "",
        description: "",
        postImage: "",
        alterText: "",
        isVisibleInPortfolio: false,
        categories: []
      });

      const handleChange = (e) => {
        const value = e.target.value;
        setPost({
          ...post,
          [e.target.name]: value
        });
      };    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            title: post.title,
            description: post.description,
            postImage: imageURL,
            alterText: post.alterText,
            categories: post.categories,
            userId: localStorage.getItem("userId")
          };
        axios.post("https://localhost:7029/api/post", userData, 
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then(
                navigate("/user/" + localStorage.getItem("userId"))
          );  
        }

        /*if(action === "edit") {
            useEffect(() => {
                axios.get(`https://localhost:7029/api/posts/${id}`)
                .then(response => {
                     setPost(response.data);
                 })
                 .catch(error => {
                     console.error(error);
                 });
             }, []);
        }*/

        const handleUpdateSubmit = (e) => {
            e.preventDefault();
            const userData = {
                title: post.title,
                description: post.description,
                alterText: post.alterText,
                categories: post.categories
              };
            axios.put(`https://localhost:7029/api/post/${id}`, userData, 
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then(
                    navigate(`/posts/${id}`)
              );  
        }

      const uploadImageDisplay = async () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setImageURL(cachedURL);
    }

    return(
        <form className="m-auto w-[80%] md:w-[60%] flex flex-col justify-start space-y-3" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center w-full">
                <label for="image-file" className="flex items-center justify-center w-full h-80 bg-cardinal/20 rounded-lg border border-dashed border-bone/80 cursor-pointer hover:bg-cardinal/40">
                    <img className="object-scale-down rounded-lg" src={imageURL} />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {imageURL == null && 
                        <>
                            <ImagePicker />
                            <p className="mb-2 text-sm"><span className="font-semibold">Click to upload image</span> or drag and drop</p>
                        </>}
                    </div>
                    <input id="image-file" type="file" className="hidden" accept="image/*" ref={fileUploadRef} onChange={uploadImageDisplay}/>
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
                    <input id="is-visible-in-portfolio" type="checkbox" value={post.isVisibleInPortfolio} onChange={handleChange}  
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