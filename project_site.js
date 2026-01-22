// Function to switch between subpages
function showPage(pageId) 
{
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {page.classList.remove('active');});

    // Show the selected page
    document.getElementById(pageId).classList.add('active');
}
