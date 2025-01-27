// Load existing inventory from localStorage
function loadInventory() {
    const savedItems = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    const gridCells = document.querySelectorAll('.grid-cell');
  
    savedItems.forEach(item => {
      const cell = document.querySelector(`.grid-cell[data-position='${item.position}']`);
      if (cell) {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.dataset.name = item.name;
        img.dataset.details = item.details;
        cell.appendChild(img);
      }
    });
  }
  
  // Save inventory to localStorage
  function saveInventory() {
    const items = [];
    const gridCells = document.querySelectorAll('.grid-cell');
  
    gridCells.forEach(cell => {
      const img = cell.querySelector('img');
      if (img) {
        items.push({
          position: cell.dataset.position,
          image: img.src,
          name: img.dataset.name,
          details: img.dataset.details,
        });
      }
    });
  
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }
  
  // Display item description
  function showItemDetails(item) {
    const modal = document.getElementById('item-modal');
    const nameElement = modal.querySelector('.item-name');
    const detailsElement = modal.querySelector('.item-details');
  
    nameElement.textContent = item.dataset.name;
    detailsElement.textContent = item.dataset.details;
    modal.classList.remove('hidden');
  
    const removeButton = modal.querySelector('.remove-item');
    removeButton.onclick = () => {
      item.parentNode.removeChild(item);
      modal.classList.add('hidden');
      saveInventory();
    };
  }
  
  // Handle item click
  function setupItemEvents() {
    const gridCells = document.querySelectorAll('.grid-cell img');
  
    gridCells.forEach(item => {
      item.addEventListener('click', () => showItemDetails(item));
    });
  }
  
  // Drag and drop functionality
  function enableDragAndDrop() {
    const gridCells = document.querySelectorAll('.grid-cell');
  
    gridCells.forEach(cell => {
      cell.addEventListener('dragover', e => e.preventDefault());
      cell.addEventListener('drop', e => {
        e.preventDefault();
        const draggedItem = document.querySelector('.dragging');
        if (cell.childElementCount === 0) {
          cell.appendChild(draggedItem);
          saveInventory();
        }
      });
    });
  
    document.addEventListener('dragstart', e => {
      if (e.target.tagName === 'IMG') {
        e.target.classList.add('dragging');
      }
    });
  
    document.addEventListener('dragend', e => {
      if (e.target.tagName === 'IMG') {
        e.target.classList.remove('dragging');
      }
    });
  }
  
  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    loadInventory();
    setupItemEvents();
    enableDragAndDrop();
  });
  