import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Spinner } from "./Spinner";


export function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [isPending, setPending] = useState(false);

    function fetchRecipes() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "/api/recipes")
        .then((res) => res.json())
        .then(setRecipes);
    }
    
    useEffect(() => {
        setPending(true);
        fetchRecipes().finally(() => {
            setPending(false);
        })
    }, []);

    if (isPending) {
        return <Spinner />
    }

    return (
        <Fragment>
            {alignToRows(recipes).map((row, i) => (
                <div className="row mb-3" key={i}>
                    {row.map((recipe) => (
                        <div className="col-md-4" key={recipe.id}>
                            <div className="card w-100 h-100">
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/static/images/${recipe.imageURL}`} alt="" className="card-img-top mb-2" />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.name}</h5>
                                </div>
                                <div className="w-75 p-3">
                                    <NavLink to={`/recept-szerkesztes/${recipe.slug}`}>
                                        <button className="btn btn-sm btn-outline-warning mr-2">
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
    );
}

const alignToRows = (items) => items.slice().reduceRight((acc, curr, i, arr) => {
    acc.push(arr.splice(0, 3));
    return acc;
}, []);