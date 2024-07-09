import { Component, Prop, h, State } from '@stencil/core';
import { format } from '../../utils/utils';
import { MyComponentVariantEnum } from './my-component-enum';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {

  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;
  @Prop({attribute: 'background-color'}) backgroundColor: string='rebeccapurple';
  @Prop() variant: MyComponentVariantEnum;
  @State() isActive: boolean=false;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  private getStyles(): object {
    console.log(this.variant)
    return {
      boxStyle: {
        height: '200px',
        width: '200px',
        color: this.getTextColor(),
        fontSize: '32px',
        backgroundColor: this.backgroundColorPicker(),
        border: `2px solid ${this.backgroundColor}`,
      }
    }
  }

  private backgroundColorPicker(): string {
    switch(this.variant) {
      case MyComponentVariantEnum.Filled:
        return this.isActive ? this.backgroundColor : 'orange';
      case MyComponentVariantEnum.Outlined:
        return 'white';
      default:
        return '';
    }
  }

  private getTextColor(): string {
    switch(this.variant) {
      case MyComponentVariantEnum.Outlined:
        return this.backgroundColor;
      case MyComponentVariantEnum.Filled:
        return 'white'
      default:
        return '';
    }
  }

  private getClasses: any=(this.getStyles())

  private handleOnClick() {
    this.isActive = !this.isActive
    this.getClasses = this.getStyles()
  }

  render() {
    return <div 
      style={this.getClasses.boxStyle}
      onClick={() => this.handleOnClick()}
      >
          Hello, World! I'm {this.getText()}
      </div>;
  }
}