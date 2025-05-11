export default function NoPage() {
    return (
      <>
        <main className="grid min-h-full place-items-center mx-[4em] -mt-20 pt-24 md:pt-32">
          <div className="text-center">
            <p className="text-4xl font-semibold text-white">404</p>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
              Сторінка не знайдена
            </h1>
            <p className="mt-6 md:w-128 w-full text-pretty text-lg font-medium text-bone md:text-xl/8">
              Схоже, що потрібної вам сторінки не існує. <br/>
              Якщо ви вважаєте, що щось зламалося, можете звернутися до підтримки "".
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/" className="text-white bg-cardinal hover:bg-red-800/75 font-medium rounded-3xl px-6 py-3 md:px-8 text-center">На головну</a>
            </div>
          </div>
        </main>
      </>
    )
  }
  