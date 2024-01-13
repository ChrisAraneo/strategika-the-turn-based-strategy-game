import { Component, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'stg-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  context: CanvasRenderingContext2D | null = null;

  constructor(private readonly viewContainerRef: ViewContainerRef) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.resizeCanvas();
    this.render();
  }

  ngAfterViewInit(): void {
    this.initializeContext();
    this.resizeCanvas();
    this.render();
  }

  private initializeContext(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  private resizeCanvas(): void {
    const { clientWidth, clientHeight } = this.viewContainerRef.element.nativeElement;

    this.canvas.nativeElement.width = clientWidth;
    this.canvas.nativeElement.height = clientHeight;
  }

  // TODO Example rendering
  private render(): void {
    if (this.context !== null) {
      this.context.rect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.context.fillStyle = 'lightgreen';
      this.context.fill();
    } else {
      throw Error('Context is empty');
    }
  }
}
