using System;
using System.Dynamic;
using System.Linq.Expressions;

namespace Zad2 {

    public class Test : DynamicObject {

        private dynamic _imie;
        private int _number;

        private dynamic[] _list;

        public Test(int a, int b) {
            _number = a;
            _list = new dynamic[b];
        }
        public override bool TryGetMember(GetMemberBinder binder, out object? result) {

            if (binder.Name == "Imie") {
                result = _imie;
                return true;
            }
            else if (binder.Name == "Value") {
                result = _number;
                return true;
            }

            return base.TryGetMember(binder, out result);
        }

        public override bool TrySetMember(SetMemberBinder binder, object? value) {

            if (binder.Name == "Imie") {
                _imie = value;
                return true;
            }
            else if (binder.Name == "Value") {
                _number = (int)value;
                return true;
            }

            return base.TrySetMember(binder, value);

        }

        public override bool TryGetIndex(GetIndexBinder binder, object[] indexes, out object? result) {
            
            int index = (int) indexes[0];

            if(index >= 0 && index < _list.Length) {
                result = _list[index];
                return true;
            }
            
            return base.TryGetIndex(binder, indexes, out result);
        }

        public override bool TrySetIndex(SetIndexBinder binder, object[] indexes, object? value) {
            int index = (int)indexes[0];
            if (index >= 0 && index < _list.Length) {
                 _list[index] = value;
                return true;
            }

            return base.TrySetIndex(binder, indexes, value);
        }

        public override bool TryInvoke(InvokeBinder binder, object?[]? args, out object? result) {
            if (args.Length > 0) {
                result = "Pierwszy argument to " + args[0].ToString();
                return true;
            }
            
            
            return base.TryInvoke(binder, args, out result);
        }
        public override bool TryInvokeMember(InvokeMemberBinder binder, object?[]? args, out object? result) {
            
            if(binder.Name == "Foo") {
                result = "Pierwszy argument to " + args[0].ToString(); // wypisanie pierwszego argumentu
                return true;
            }
            return base.TryInvokeMember(binder, args, out result);

        }

        public override bool TryUnaryOperation(UnaryOperationBinder binder, out object? result) {
            if (binder.Operation == ExpressionType.Decrement) {
                _number--;
                result = _number;
                return true;
            }
            if (binder.Operation == ExpressionType.Increment) {
                _number++;
                result = _number;
                return true;
            }
            result = null;

            return false;
        }

        public override bool TryBinaryOperation(BinaryOperationBinder binder, object arg, out object? result) {
         
            if(binder.Operation == ExpressionType.Add) {
                _number += (int)arg;
                result = _number;
                return true;
            }
            else if (binder.Operation == ExpressionType.Subtract) {
                _number -= (int)arg;
                result = _number;
                return true;
            }
            else if (binder.Operation == ExpressionType.Multiply) {
                _number *= (int)arg;
                result = _number;
                return true;
            }
            else if (binder.Operation == ExpressionType.Divide) {
                _number /= (int) arg;
                result = _number;
                return true;
            }
            return base.TryBinaryOperation(binder, arg, out result);
        }
    }
    public class Program {
        public static void Main(string[] args) {
            dynamic test1 = new Test(0,3);

              Console.WriteLine("Test TrySetMember i TryGetMember");
              test1.Imie = "Michal";
              Console.WriteLine("Imie = " + test1.Imie);


            Console.WriteLine('\n');
            Console.WriteLine("Test TrySetIndex i TryGetIndex");
            test1[0] = 42;
            Console.WriteLine("Element znajdujacy sie na indeksie 0 = " + test1[0]);

            Console.WriteLine('\n');
            Console.WriteLine("Test TryInvoke i TryInvokeMember");
            Console.WriteLine(test1(1, 2, 3));
            Console.WriteLine(test1.Foo("ASDS", "bfsd"));


            Console.WriteLine('\n');
            Console.WriteLine("Test TryUnaryOperation i TryBinaryOperation");
            Console.WriteLine(test1 + 3);
            test1--; 
            Console.WriteLine(test1);


        }
    }
}