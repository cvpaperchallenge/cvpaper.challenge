#!/bin/sh

#一番上の+slideの上に挿入したい
#判定が必要
#開始位置？

# %A: 現在のブランチの状態　ours
# %B: マージしようとしているブランチの状態 theirs
# %O: 共通の祖先の状態 base
# %L: コンフリクトマーカの長さ。1.7から使えるらしい
# %P: ファイルのパス。2.5.0から使えるらしい

#案
#union mergeして，+slideが欠けたら入れる
#問題点：計算が長くなるかも
# 挿入したところが分かれば，その周りだけ検索するけど

A="$1"
O="$2"
B="$3"
L="$4"
P="$5"

retval=0

echo "$A $O $B $L $P"

if [ "$P" -eq "slides/index.pug" ]
then
	echo "apply union merge to $P"
	git merge-file -q --union "$A" "$O" "$B"
	echo "check and fix format $P"
	node fix-slide-format.js "$A"

	# if [ $? = 0 ]
	# then
		# #問題ない
		# retval=0
	# else
		# #コンフリクトか何かあった
		# node fix-slide-format.js "$A"
		# retval=0
	# fi
else
	#ふつうにやる
	git merge-file -q --text "$A" "$O" "$B"
	retval=$?
fi

exit $retval

# A="$1"
# O="$2"
# B="$3"
# tmpfile=$(mktemp temp.XXXXXX)
# cp "$A" "$tmpfile"
# git merge-file -p -q --union "$tmpfile" "$O" "$B" | sort | uniq > "$A"
# rm "$tmpfile"

