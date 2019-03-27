import { HypenTransformPipe } from './hypen-transform.pipe';

describe('HypenTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new HypenTransformPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform to hypen case', () => {
    const pipe = new HypenTransformPipe();
    expect(pipe.transform('Drama Show')).toEqual('drama-show');
  });
});
