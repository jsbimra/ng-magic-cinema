import { HypenTransformPipe } from './hypen-transform.pipe';

describe('HypenTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new HypenTransformPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform to hypen-case word', () => {
    const pipe = new HypenTransformPipe();
    expect(pipe.transform('Drama Show')).toEqual('drama-show');
  });

  it(`should do opposite of tranform to hypen-case word with remove param`, ()=> {
    const pipe = new HypenTransformPipe();
    console.log(pipe);
    expect(pipe.transform('drama-show', 'remove')).toEqual('drama show')
  });
  
});
