import React from "react";

//import useState from react
import { useState } from "react";

import { useCreateCatProductMutation } from "../redux/api";

const NewProductForm = () => {

    const [createCatProduct, {isLoading}]= useCreateCatProductMutation();

    const [id, setId]= useState("");
    const [productName, setProductName]= useState("");
    const [detail, setDetail]= useState("");
    const [price, setPrice]=useState("");
    const [imageUrl, setImageUrl]= useState("");
    const [error, setError]= useState("")


    function resetForm(){
        setId("");
        setProductName("");
        setDetail("");
        setPrice("");
        setImageUrl("");
        setError("");
    }

    async function handleSubmit(e){
        //prevent the browser from refreshing the page
        e.preventDefault();

        //read data directly from state
        console.log({id,name:productName,detail,imageUrl,price});

        if(!error){
            createCatProduct({id,name:productName,detail,imageUrl,price})
        }
    }

    return(
        <div className="formContainer">
                <h2>Add New Product</h2>
                {error && <p>{error}</p>}
            <form className= "form" method="post" onSubmit={handleSubmit}>
                <label>
                    Id:{"  "}
                    <input
                        name="productId"
                        value={id}
                        onChange={(e) =>setId(e.target.value)}
                    />
                </label>

                <label>
                    Name:{" "}
                    <input
                        name="productName"
                        value={productName}
                        onChange={(e) =>setProductName(e.target.value)}
                    />
                </label>

                <label>
                    Description:{" "}
                    <input
                        name="detail"
                        value={detail}
                        onChange={(e) =>setDetail(e.target.value)}
                    />
                </label>
                <label>
                Price:{" "}
                    <input
                        name="price"
                        value={price}
                        onChange={(e) =>setPrice(e.target.value)}
                    />
                </label>

                <label>
                    Image:{" "}
                    <input
                        name="productImage"
                        value={imageUrl}
                        onChange={(e) =>setImageUrl(e.target.value)}
                    />
                </label>

                <button type="reset" onClick={resetForm}>Reset</button>
                <button disabled={error} type="submit">Submit</button>
            </form>
        </div>
        )
}

export default NewProductForm;