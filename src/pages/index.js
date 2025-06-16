import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function NarrQuestCompass() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { id: "autonomy", question: "你是否具備獨立思考與自我駕馭的語氣？（1~10分）", type: "scale" },
    { id: "goal", question: "你最看重以下哪一項？", type: "choice", options: ["金錢", "生活品質", "聲譽", "社會地位"] },
    { id: "explore", question: "你對新鮮嘗試的渴求程度（1~10分）", type: "scale" },
    { id: "freedom", question: "你是否嚮往國外自由與活潑的學習氣氛？（1~10分）", type: "scale" },
    { id: "major", question: "你目前考慮的科系或方向為？", type: "input" }
  ];

  const handleAnswer = (value) => {
    const current = questions[step];
    setAnswers({ ...answers, [current.id]: value });
    if (step < questions.length - 1) setStep(step + 1);
    else generateResult({ ...answers, [current.id]: value });
  };

  const generateResult = (data) => {
    const score = Number(data.autonomy) + Number(data.explore) + Number(data.freedom);
    let profile = "";
    if (score >= 24) profile = "🌟 主體型語氣：你是命運的創造者，建議參與 NarrQuest 發表與跨域拼圖挑戰。";
    else if (score >= 18) profile = "🌱 自我導向型語氣：你已具備敘事覺察力，適合自由探索與多元嘗試。";
    else profile = "🌙 社會期待型語氣：你正在尋找自己的聲音，可從穩定發表與NarrQuest 基礎包開始。";
    setResult(profile);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">NarrQuest Compass 語氣羅盤</h1>
      {!result ? (
        <Card>
          <CardContent className="space-y-4 p-4">
            <p className="text-lg font-medium">{questions[step].question}</p>
            {questions[step].type === "choice" && questions[step].options.map((opt) => (
              <Button key={opt} onClick={() => handleAnswer(opt)} className="w-full">{opt}</Button>
            ))}
            {questions[step].type === "scale" && (
              <Input type="number" min="1" max="10" onBlur={(e) => handleAnswer(e.target.value)} placeholder="請輸入1~10" />
            )}
            {questions[step].type === "input" && (
              <Input type="text" onBlur={(e) => handleAnswer(e.target.value)} placeholder="請輸入你的回答" />
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">你的語氣診斷結果</h2>
            <p>{result}</p>
            <p className="text-sm text-gray-500">NarrQuest 鼓勵每一位探索者，成為語氣主體，打造屬於自己的敘事宇宙。</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
