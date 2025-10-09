$images = @(
  @{ url = "https://source.unsplash.com/400x300/?protein,shake,plant"; file = "protein_shake_plant.jpg" },
  @{ url = "https://source.unsplash.com/400x300/?small,apple"; file = "small_apple.jpg" },
  @{ url = "https://source.unsplash.com/400x300/?rice,cake,hummus"; file = "rice_cake_hummus.jpg" }
)

$outDir = Join-Path $PSScriptRoot "images"
if(-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

foreach($it in $images) {
  $out = Join-Path $outDir $it.file
  if(Test-Path $out) { Write-Host "Skipping existing file: $out"; continue }
  Write-Host "Downloading: $($it.url) -> $out"
  try {
    Invoke-WebRequest -Uri $it.url -OutFile $out -UseBasicParsing -ErrorAction Stop
  } catch {
    Write-Host "Download failed for $($it.url): $_"
  }
}
Write-Host "Download-more script finished."
