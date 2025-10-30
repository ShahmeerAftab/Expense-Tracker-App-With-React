interface PageTitleType{
    title:string
}

const PageTitle = ({title}:PageTitleType) => {
  return (
    <>
       <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center drop-shadow-md">
          {title}
        </h2>
    </>
  )
}

export default PageTitle
