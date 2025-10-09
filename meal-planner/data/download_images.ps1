$images = @(
  @{ url = "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"; file = "greek_yogurt_parfait.jpg" },
  @{ url = "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=300&fit=crop"; file = "oats_berries_pb.jpg" },
  @{ url = "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"; file = "tofu_scramble_wrap.jpg" },
  @{ url = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop"; file = "egg_avocado_toast.jpg" },
  @{ url = "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop"; file = "chia_pudding.jpg" },
  @{ url = "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop"; file = "apple_almonds.jpg" },
  @{ url = "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop"; file = "cottage_cheese_cup.jpg" },
  @{ url = "https://images.unsplash.com/photo-1582719478250-8f2d3d8a4b13?w=400&h=300&fit=crop"; file = "protein_shake_plant.jpg" },
  @{ url = "https://images.unsplash.com/photo-1541542684-45f7b8f5b8d0?w=400&h=300&fit=crop"; file = "grilled_chicken_bowl.jpg" },
  @{ url = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"; file = "hummus_veg_pita.jpg" },
  @{ url = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"; file = "buddha_bowl_tofu.jpg" },
  @{ url = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"; file = "shrimp_stir_fry.jpg" },
  @{ url = "https://images.unsplash.com/photo-1574226516831-e1dff420e38e?w=400&h=300&fit=crop"; file = "small_apple.jpg" },
  @{ url = "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop"; file = "celery_pb.jpg" },
  @{ url = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop"; file = "greek_yogurt_small.jpg" },
  @{ url = "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop"; file = "egg_white_scramble.jpg" },
  @{ url = "https://images.unsplash.com/photo-1565299585323-38dd0513d271?w=400&h=300&fit=crop"; file = "rice_cake_hummus.jpg" },
  @{ url = "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop"; file = "pasta_marinara.jpg" }
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
    Write-Host "First attempt failed for $($it.url): $_. Retrying..."
    Start-Sleep -Seconds 1
    try { Invoke-WebRequest -Uri $it.url -OutFile $out -UseBasicParsing -ErrorAction Stop } catch { Write-Host "Failed to download $($it.url): $_" }
  }
}

Write-Host "Download script finished."
