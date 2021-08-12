const Pagination = ({
  ProductsPerPage,
  TotalProducts,
  paginate,
  CurrentPage,
}) => {
  const PageNumbers = [];
  for (let i = 1; i <= Math.ceil(TotalProducts / ProductsPerPage); i++)
    PageNumbers.push(i);

  return (
    <div className=" col-6 m-auto text-center">
      {/* hidden={PageNumbers.length === 1} */}
      {PageNumbers.map((number) => (
        <button
          key={number}
          className={`btn m-1 ${CurrentPage === number ? "btn-one" : "btn"}`}
          onClick={() => paginate(number)}
          hidden={PageNumbers == 1}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
