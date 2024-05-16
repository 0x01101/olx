$excludeDirs = @("node_modules", ".git", ".idea", ".next", "components/ui")

function IsExcluded($path) {
    foreach ($excludeDir in $excludeDirs) {
        if ($path -like "*\$excludeDir\*") {
            return $true
        }
    }
    return $false
}

$files = Get-ChildItem -Recurse -File

$totalLineCount = 0

foreach ($file in $files) {
    if (-not (IsExcluded $file.FullName)) {
        try {
            $lineCount = Get-Content -LiteralPath $file.FullName | Measure-Object -Line
            $totalLineCount += $lineCount.Lines
        } catch {
            Write-Output ("Failed to read file: $($file.FullName). Error: $($_.Exception.Message)")
        }
    }
}

Write-Output ("Total lines: $totalLineCount")