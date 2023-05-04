import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rowNumber = 20;
  columnNumber = 20;
  boxMatrix: boolean[][] = this.createBoxMatrix(this.rowNumber, this.columnNumber)
  rows = this.fillPositions(this.rowNumber);
  columns = this.fillPositions(this.columnNumber);
  color = 'blue';
  ngOnInit(): void {
  }
  fillPositions(length: number) {
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(i)
    }
    return array
  }
  createBoxMatrix(rowNumber: number, columnNumber: number): boolean[][] {
    const boxMatrix = []
    for (let i = 0; i < rowNumber; i++) {
      const boxes = Array(columnNumber).fill(false)
      boxMatrix.push(boxes)
    }
    return boxMatrix
  }

  getColor(x: number, y: number): string {
    if (this.boxMatrix[x][y]) {
      return 'red'
    } else {
      return 'white'
    }
  }

  swapColor(x: number, y: number): void {
    this.boxMatrix[x][y] = !this.boxMatrix[x][y]
  }

  getLiveNeighbours(x: number, y: number): number {
    let liveNeighbours = 0
    if (x < this.rowNumber - 1 && this.boxMatrix[x + 1][y]) {
      ++liveNeighbours
    }
    if (x > 0 && this.boxMatrix[x - 1][y]) {
      ++liveNeighbours
    }
    if (y < this.columnNumber - 1 && this.boxMatrix[x][y + 1]) {
      ++liveNeighbours
    }
    if (y > 0 && this.boxMatrix[x][y - 1]) {
      ++liveNeighbours
    }
    if (x < this.rowNumber - 1 && y < this.columnNumber - 1 && this.boxMatrix[x + 1][y + 1]) {
      ++liveNeighbours
    }
    if (x > 0 && y > 0 && this.boxMatrix[x - 1][y - 1]) {
      ++liveNeighbours
    }
    if (x > 0 && y < this.columnNumber - 1 && this.boxMatrix[x - 1][y + 1]) {
      ++liveNeighbours
    }
    if (x < this.rowNumber - 1 && y > 0 && this.boxMatrix[x + 1][y - 1]) {
      ++liveNeighbours
    }
    return liveNeighbours;
  }

  play(): void {
    setInterval(() => {
      for (let x = 0; x < this.rowNumber; x++) {
        for (let y = 0; y < this.columnNumber; y++) {
          const liveNeighbours = this.getLiveNeighbours(x, y);
          let isLive = this.boxMatrix[x][y];
          if (isLive) {
            if (liveNeighbours < 2) {
              isLive = false
            }
            if (liveNeighbours > 3) {
              isLive = false
            }
          } else {
            if (liveNeighbours === 3) {
              isLive = true
            }
          }
          this.boxMatrix[x][y] = isLive;

        }
      }
    }, 1000)
  }


}
