# TeachWise AI Deployment Script
# This script commits changes and deploys to Vercel production

param(
    [string]$CommitMessage = "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "TeachWise AI Deployment Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check for uncommitted changes
Write-Host "Checking for changes..." -ForegroundColor Yellow
$status = git status --porcelain

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Green
} else {
    Write-Host "Changes detected. Committing..." -ForegroundColor Yellow
    
    # Add all changes
    git add -A
    
    # Commit with message
    git commit -m $CommitMessage
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Changes committed successfully" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Commit failed" -ForegroundColor Red
        exit 1
    }
    
    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Pushed to GitHub successfully" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Push failed" -ForegroundColor Red
        exit 1
    }
}

# Deploy to Vercel
Write-Host ""
Write-Host "Deploying to Vercel production..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==================================" -ForegroundColor Green
    Write-Host "[SUCCESS] Deployment completed!" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[ERROR] Deployment failed" -ForegroundColor Red
    exit 1
}
