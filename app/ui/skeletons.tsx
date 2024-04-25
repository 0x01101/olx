import styles from "@/app/ui/elements/css/categories.module.css";

const shimmer: string = "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CategoriesSkeleton (): JSX.Element {
  return (
    <div className={`${styles.container} ${shimmer}`}>
      <div className={styles.innerContainer}>
        <div className={styles.categories}>
          <div>
            <div className="mr-2 h-20 w-20 rounded-full bg-gray-200"/>
          </div>
        </div>
      </div>
    </div>
  )
}