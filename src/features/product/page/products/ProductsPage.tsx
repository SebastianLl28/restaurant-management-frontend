import useCategoriesFielter from './hook/useCategoriesFielter'
import ProductCards from './section/ProductCards'
import ProductCategories from './section/ProductCategories'
import ProductFilter from './section/ProductFilter'

const ProductsPage = () => {
  // TODO: Cuando se hace un fetch por segunda vez ( se agregan filtrados ) se muestra el skeleton
  const {
    handleSearch,
    handleCategory,
    handleOrderBy,
    handlePageChange,
    filter,
    ...args
  } = useCategoriesFielter()

  return (
    <main className='container mb-12 mt-12 space-y-12'>
      <ProductCategories
        handleCategory={handleCategory}
        categoryId={filter.categoryId}
      />
      <ProductFilter
        handleSearch={handleSearch}
        handleOrderBy={handleOrderBy}
      />
      <ProductCards
        {...args}
        handlePageChange={handlePageChange}
        page={filter.page}
      />
    </main>
  )
}

export default ProductsPage
