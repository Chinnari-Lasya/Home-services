import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { categories } from '../../data/categories'
import './CategoryList.css'

function CategoryList() {
  const { t } = useTranslation()

  return (
    <div className="category-list">
      <h2 className="section-title">{t('common.categories')}</h2>
      <div className="categories">
        {categories.map((category) => (
          <Link 
            to={`/category/${category.id}`} 
            key={category.id} 
            className="category-item"
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList