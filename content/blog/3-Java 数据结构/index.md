---
title: Java 数据结构研究
date: "2023-01-05 10:03:03"
description: 为了效率的东西Collection sort 
---
Java中Collections.sort()排序详解
Comparable 排序接口
Comparator比较器接口

https://juejin.cn/post/6856770166550855688
Java - Collections.sort() 的介紹及用法
https://ithelp.ithome.com.tw/articles/10229625

collection
https://www.liaoxuefeng.com/wiki/1252599548343744/1299919855943714

Class ArrayDeque<E>
https://docs.oracle.com/javase/7/docs/api/java/util/ArrayDeque.html

使用PriorityQueue(实现了一个优先队列：从队首获取元素时，总是获取优先级最高的元素。)
https://www.liaoxuefeng.com/wiki/1252599548343744/1265120632401152

public class HelloWorld {
    public static void main(String []args) {
		char t = '0';
		int i = 0;
		System.out.println(t);
		char ii = (char)i;
		System.out.println(t == (char)i);
		System.out.println(ii);
		System.out.println(t == ii);
		System.out.println((t-'0') == ii);
    }
}
The comparison t == ii is not true because t and ii are of different data types. The value of t is a character '0', while the value of ii is an integer representation of the character 0 (which is 48 in the ASCII table). When you compare t and ii using the equality operator ==, the comparison is done between the values of the characters and not the characters themselves, and therefore the comparison is not true.

To compare the characters themselves, you need to compare their character values by casting i to char before the comparison, like this: