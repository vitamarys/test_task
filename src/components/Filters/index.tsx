import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

const Filters: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { register, handleSubmit, reset } = useForm({
    defaultValues:{
      title:  searchParams.get("title") || '',
      from: searchParams.get("from") || '',
      to: searchParams.get("to") || '',
      price_from: searchParams.get("price_from") || '',
      price_to:searchParams.get("price_to") || ''
    },
    mode: "onTouched",
  });
  const onSubmit = handleSubmit((data) => {
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== "") {
        queryParams.append(key, value);
      }
    });
    navigate(`?${queryParams.toString()}`);
  });
  const handleReset = () => {
    reset();
    navigate("/shop");
  };

  return (
    <form onSubmit={onSubmit} className="filter-form">
      <div className="input-wrap">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" {...register("title")} />
      </div>
      <div className="input-wrap">
        <label htmlFor="from">Date from</label>
        <input id='from' type="date" {...register("from")} />
      </div>
      <div className="input-wrap">
        <label htmlFor="to">Date to</label>
        <input id="to" type="date" {...register("to")} />
      </div>

      <div className="input-wrap">
        <label htmlFor="price_from">Price from</label>
        <input id="price_from" type="number" {...register("price_from")} />
      </div>

      <div className="input-wrap">
      <label htmlFor="price_to">Price to</label>
        <input id="price_to" type="number" {...register("price_to")} />
      </div>

      <button type="submit">Filter</button>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default Filters;
