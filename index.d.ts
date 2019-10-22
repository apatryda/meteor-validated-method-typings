import { EJSONable, EJSONableProperty } from 'meteor/ejson';
import { Meteor } from 'meteor/meteor';

export type ValidatedMethodArgs = EJSONable | EJSONableProperty;
export type ValidatedMethodResult = EJSONable | EJSONable[] | EJSONableProperty | EJSONableProperty[] | void;
export type ValidatedMethodCallback<Result extends ValidatedMethodResult = void> = (error: Error | Meteor.Error | undefined, result?: Result) => void;
export interface ValidatedMethodApplyOptions<Result extends ValidatedMethodResult = never> {
  onResultReceived?: ValidatedMethodCallback<Result>;
  returnStubValue?: boolean;
  throwStubExceptions?: boolean;
  wait?: boolean;
}
export type ValidatedMethodMixin<
  Args extends ValidatedMethodArgs = undefined,
  Result extends ValidatedMethodResult = void,
> = (methodOptions: ValidatedMethodOptions<Args, Result>) => ValidatedMethodOptions<Args, Result>;

export interface ValidatedMethodOptions<
  Args extends ValidatedMethodArgs = undefined,
  Result extends ValidatedMethodResult = void,
> {
  name: string;
  run(this: Meteor.MethodThisType, args?: Args): PromiseLike<Result> | Result;
  validate: ((args: Args) => void) | null;
  applyOptions?: ValidatedMethodApplyOptions<Result>;
  mixins?: ValidatedMethodMixin<Args, Result>[];
}

export class ValidatedMethod<
  Args extends ValidatedMethodArgs = undefined,
  Result extends ValidatedMethodResult = void,
> {
  constructor(options: ValidatedMethodOptions<Args, Result>);
  _execute(context: Partial<Meteor.MethodThisType>, args?: Args): void;
  call(args: Args, callback: ValidatedMethodCallback<Result>): void;
  call(argsOrCallback?: Args | ValidatedMethodCallback<Result>): void;
}
