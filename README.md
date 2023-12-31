# Игра "Инь-Ян"

Игра доступна по ссылке - https://Kiiro63.github.io/yin-yang

## Описание

Эта игра представляет собой клеточный автомат, который моделирует закон единства и борьбы противоположностей, вдохновленный философией Инь и Ян. В этой игре клетки могут находиться в трех состояниях: пустые (мёртвые), живые Инь и живые Ян. Игра эволюционирует на основе следующих правил:

## Правила игры

1. **Рождение:** Если у пустой ячейки ровно три соседа (живых), и среди соседей только один Инь или только один Ян, то в ней рождается Ян или Инь соответственно.

2. **Гибель от перенаселения (одиночества):** Живая ячейка, имеющая больше четырех или меньше двух живых соседей, умирает от перенаселения или одиночества.

3. **Гибель в неравном противостоянии:** У живой ячейки ровно четыре соседа, из которых большинство - противоположного типа, то ячейка умирает.

## Как играть

1. Щелкните по ячейкам, чтобы изменить их состояние между Инь и Ян, или сделать их мёртвыми.
2. Используйте кнопку "Заполнить", чтобы заполнить сетку случайными состояниями Инь и Ян.
3. Нажмите "Старт", чтобы начать эволюцию игры автоматически.
4. Нажмите "Стоп", чтобы приостановить эволюцию.
5. Используйте кнопку "Очистить", чтобы очистить сетку.

## Технические детали

- Сетка имеет размер 20x20.
- Размер ячейки составляет 20 пикселей.
- Задержка между шагами игры установлена на 200 миллисекунд.
