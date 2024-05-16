$excludeDirs = @("node_modules", ".git", ".idea", ".next", "components/ui", "assets/images", "package-lock.json", "sql/ERDiagram.png")

function IsExcluded($path) {
    foreach ($excludeDir in $excludeDirs) {
        if ($path -like "*\$excludeDir*") {
            return $true
        }
    }
    return $false
}

$files = Get-ChildItem -Recurse -File

$totalLineCount = 0

$fileLineCounts = @{}

foreach ($file in $files) {
    if (-not (IsExcluded $file.FullName)) {
        try {
            $lineCount = Get-Content -LiteralPath $file.FullName | Measure-Object -Line
            $totalLineCount += $lineCount.Lines
            $fileLineCounts[$file.FullName] = $lineCount.Lines
        } catch {
            Write-Output ("Failed to read file: $($file.FullName). Error: $($_.Exception.Message)")
        }
    }
}

Write-Output ("Total lines: $totalLineCount")

$topFiles = $fileLineCounts.GetEnumerator() | Sort-Object -Property Value -Descending | Select-Object -First 3

Write-Output ("Top 3 files with most lines:")
$topFiles | ForEach-Object { Write-Output ("$($_.Key): $($_.Value) lines") }