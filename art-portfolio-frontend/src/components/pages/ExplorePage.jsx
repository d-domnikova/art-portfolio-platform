import PostPreview from '../pagesComponents/PostPreview'

export default function ExplorePage() {
    return(
        <div>
            <h1 className="text-3xl text-white font-bold py-4">Explore</h1>
            <div className='space-x-3 font-semibold mb-4'>
                {/*{categories.map((category) => (
                                        <Category key={category.id} 
                                        id={category.id} title={category.categoryName/>}
                            ))*/}
                 <a href="" className='inline-block px-3 py-2 border border-bone rounded-sm hover:bg-bone/20'>Categories</a>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {/*{posts.map((post) => (
                                        <PostPreview key={post.id} 
                                        id={post.id} title={post.title} user={post.userId}/>}
                            ))*/}
            </div>
        </div>
    )
}

function Category(props){
    return(
        <a href={props.href} className='inline-block px-3 py-2 border border-bone rounded-sm hover:bg-bone/20'>{props.title}</a>
    )
}