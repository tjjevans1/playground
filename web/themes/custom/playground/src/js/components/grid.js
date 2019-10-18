const grid = () => {
  (function($) {

    const selectors = {
      grid: 'data-pg-grid',
      slot: 'data-pg-grid-slot',
      item: 'data-pg-grid-item'
    };

    const $selections = {
      grids: $(`[${selectors.grid}]`),
    };

    const getColDivisions = (array) => {
      let solution = {a: 1, b: 2};

      for(let a = solution.a; a < array.length - 1; a++) {
        for(let b = solution.b; b < array.length; b++) {
          let cols = [
            array.slice(0, a),
            array.slice(a, b),
            array.slice(b),
          ];

          let sums = [];

          cols.forEach(col => {
            let sum = 0;
            col.forEach(item => {
              sum += item;
            });
            sums.push(sum);
          });

          let largest = Math.max(...sums);

          let smallest = Math.min(...sums);

          let residual = largest - smallest;

          if (!solution.hasOwnProperty('residual') || residual < solution.residual) {
            solution = {a, b, residual};
          }
        }
      }

      return solution;
    };

    const bindToGrid = (element) => {
      const $grid = $(element);
      const $items = $grid.find(`[${selectors.item}]`);
      const $slots = $grid.find(`[${selectors.slot}]`);

      let heights = [];

      $items.each((index, element) => {
        heights.push($(element).outerHeight());
      });

      let solution = getColDivisions(heights);

      $items.each((index, element) => {
        if (index < solution.a) {
          $($slots[0]).append($(element));
        } 

        if (index >= solution.a) {
          $($slots[1]).append($(element));
        } 

        if (index >= solution.b) {
          $($slots[2]).append($(element));
        }
      });
    };

    const initGrids = () => {
      $selections.grids.each((index, element) => {
        bindToGrid(element);
      });
    };

    initGrids();

    $(window).off('breakpoint', initGrids).on('breakpoint', initGrids);

  })(jQuery);
};

export default grid;