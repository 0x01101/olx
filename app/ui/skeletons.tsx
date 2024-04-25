import styles from "@/app/ui/elements/css/categories.module.css";

const shimmer: string = "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CategoriesSkeleton (): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.categories}>
          <div>
            <div className="h-5 w-5 rounded-md bg-gray-200"/>
            <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium"/>
          </div>
        </div>
      </div>
    </div>
  )
}